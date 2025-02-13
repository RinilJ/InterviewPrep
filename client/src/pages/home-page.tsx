import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Test, TestResult } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const { data: tests, isLoading: testsLoading } = useQuery<Test[]>({
    queryKey: ["/api/tests"],
  });

  const { data: results, isLoading: resultsLoading } = useQuery<TestResult[]>({
    queryKey: ["/api/test-results"],
  });

  if (testsLoading || resultsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Interview Prep Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Welcome, {user?.username} ({user?.role})
            </span>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Aptitude Tests</CardTitle>
              <CardDescription>
                Practice logical reasoning and problem-solving
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tests?.filter(t => t.type === "aptitude").map(test => (
                <div key={test.id} className="p-4 border rounded-lg mb-4">
                  <h3 className="font-semibold">{test.title}</h3>
                  <p className="text-sm text-slate-600">
                    {test.questions.length} questions
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Tests</CardTitle>
              <CardDescription>
                Test your technical knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tests?.filter(t => t.type === "technical").map(test => (
                <div key={test.id} className="p-4 border rounded-lg mb-4">
                  <h3 className="font-semibold">{test.title}</h3>
                  <p className="text-sm text-slate-600">
                    {test.questions.length} questions
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>
                Your test performance history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results?.map(result => {
                const test = tests?.find(t => t.id === result.testId);
                return (
                  <div key={result.id} className="p-4 border rounded-lg mb-4">
                    <h3 className="font-semibold">{test?.title}</h3>
                    <p className="text-sm text-slate-600">
                      Score: {result.score}%
                    </p>
                    <p className="text-xs text-slate-500">
                      {format(new Date(result.completedAt), "PPp")}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
