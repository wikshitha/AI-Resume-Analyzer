import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { analyzeResumeWithJD } from "../services/gemini.service";
import redisClient from "../config/redis";


const prisma = new PrismaClient();


const safeArray = (value: unknown): string[] => {
  return Array.isArray(value)
    ? value.filter(
        (item): item is string =>
          typeof item === "string"
      )
    : [];
};



export const analyzeResume = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const resumeId = req.params.id as string;

    const {
      jobDescription
    } = req.body;


    if(!resumeId){
      return res.status(400).json({
        message:"Resume ID required"
      });
    }


    if(!jobDescription){
      return res.status(400).json({
        message:"Job description required"
      });
    }



    /*
      Redis cache key

      Example:
      resume-analysis:123:frontend developer
    */

    const cacheKey =
      `resume-analysis:${resumeId}:${jobDescription}`;



    // Check Redis first

    const cachedData =
      await redisClient.get(cacheKey);



    if(cachedData){

      console.log(
        "Returning from Redis"
      );


      return res.status(200).json({
        success:true,
        message:
          "Analysis fetched from cache",
        data:
          JSON.parse(cachedData)
      });

    }





    // Fetch Resume

    const resume =
      await prisma.resume.findUnique({

        where:{
          id:resumeId
        }

      });



    if(!resume){

      return res.status(404).json({
        message:
          "Resume not found"
      });

    }



    if(!resume.extractedText){

      return res.status(400).json({
        message:
          "Resume text missing"
      });

    }




    // Gemini Call

    const aiResponse =
      await analyzeResumeWithJD(
        resume.extractedText,
        jobDescription
      );



    if(!aiResponse){

      return res.status(500).json({
        message:
          "Gemini failed"
      });

    }




    const cleanedResponse =
      aiResponse
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



    let parsed;


    try{

      parsed =
        JSON.parse(cleanedResponse);

    }

    catch(error){

      console.log(
        cleanedResponse
      );


      return res.status(500).json({
        message:
          "Invalid AI JSON"
      });

    }




    // Save database

    const updatedResume =
      await prisma.resume.update({

      where:{
        id:resumeId
      },


      data:{

        jobDescription,

        atsScore:
          parsed.atsScore ?? 0,


        jobMatchScore:
          parsed.jobMatchScore ?? 0,


        keywordCoverage:
          parsed.keywordCoverage ?? 0,


        matchedSkills:
          safeArray(
            parsed.matchedSkills
          ),


        missingSkills:
          safeArray(
            parsed.missingSkills
          ),


        strengths:
          safeArray(
            parsed.strengths
          ),


        weaknesses:
          safeArray(
            parsed.weaknesses
          ),


        suggestions:
          safeArray(
            parsed.suggestions
          ),


        summary:
          parsed.summary ?? ""

      }

    });





    // Save result into Redis

    await redisClient.set(

      cacheKey,

      JSON.stringify(updatedResume),

      {
        EX:
          3600
      }

    );



    console.log(
      "Saved analysis to Redis"
    );




    return res.status(200).json({

      success:true,

      message:
        "Resume analyzed successfully",

      data:
        updatedResume

    });



  }


  catch(error){


    console.error(error);


    return res.status(500).json({

      success:false,

      message:
        "AI analysis failed",

      error:
        error instanceof Error
        ? error.message
        : "Unknown error"

    });


  }

};