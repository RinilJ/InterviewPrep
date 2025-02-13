import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChartLineUp,
  Calendar,
  Users,
  BookOpen,
  Brain,
  Code,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { Test, TestResult, DiscussionSlot } from "@shared/schema";

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: tests, isLoading: testsLoading } = useQuery<Test[]>({
    queryKey: ["/api/tests"],
  });

  const { data: results, isLoading: resultsLoading } = useQuery<TestResult[]>({
    queryKey: ["/api/test-results"],
  });

  const { data: slots, isLoading: slotsLoading } = useQuery<DiscussionSlot[]>({
    queryKey: ["/api/discussion-slots"],
  });

  if (testsLoading || resultsLoading || slotsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const testsByType = tests?.reduce((acc, test) => {
    if (!acc[test.type]) {
      acc[test.type] = [];
    }
    acc[test.type].push(test);
    return acc;
  }, {} as Record<string, Test[]>);

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <div className="bg-white border-b mb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-slate-600 mt-1">
                  Welcome back, {user?.username}
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Discussion
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <ChartLineUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-2xl font-bold">
                        {results?.length
                          ? Math.round(
                              results.reduce((acc, r) => acc + r.score, 0) /
                                results.length
                            )
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Tests Completed</p>
                      <p className="text-2xl font-bold">{results?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        Upcoming Discussions
                      </p>
                      <p className="text-2xl font-bold">
                        {slots?.filter(
                          (s) => new Date(s.startTime) > new Date()
                        ).length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tests">Test Modules</TabsTrigger>
            <TabsTrigger value="discussions">Group Discussions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Aptitude Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testsByType?.aptitude?.map((test) => (
                    <div
                      key={test.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{test.title}</p>
                        <p className="text-sm text-slate-600">
                          {test.questions.length} questions
                        </p>
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technical Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testsByType?.technical?.map((test) => (
                    <div
                      key={test.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{test.title}</p>
                        <p className="text-sm text-slate-600">
                          {test.questions.length} questions
                        </p>
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Psychometric Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testsByType?.psychometric?.map((test) => (
                    <div
                      key={test.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{test.title}</p>
                        <p className="text-sm text-slate-600">
                          {test.questions.length} questions
                        </p>
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Group Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slots
                    ?.filter((s) => new Date(s.startTime) > new Date())
                    .map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{slot.topic}</p>
                          <p className="text-sm text-slate-600">
                            {format(new Date(slot.startTime), "PPp")} -{" "}
                            {format(new Date(slot.endTime), "p")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results?.map((result) => {
                    const test = tests?.find((t) => t.id === result.testId);
                    return (
                      <div
                        key={result.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{test?.title}</p>
                          <p className="text-sm text-slate-600">
                            Completed on{" "}
                            {format(new Date(result.completedAt), "PPp")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {result.score}%
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
