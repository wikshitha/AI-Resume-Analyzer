import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>AI Resume Analyzer</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />

          <Button className="w-full">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}