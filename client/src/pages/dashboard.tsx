import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: tests, isLoading: testsLoading } = useQuery<Test[]>({
    queryKey: ["/api/tests"],
  });

  const { data: results, isLoading: resultsLoading } = useQuery<TestResult[]>({
    queryKey: ["/api/test-results"],
  });

  const { data: slots, isLoading: slotsLoading } = useQuery<
    (DiscussionSlot & { mentor?: { username: string } })[]
  >({
    queryKey: ["/api/discussion-slots"],
  });

  const bookSlotMutation = useMutation({
    mutationFn: async (slotId: number) => {
      const res = await apiRequest("POST", "/api/slot-bookings", { slotId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discussion-slots"] });
      toast({
        title: "Success",
        description: "Successfully booked the discussion slot",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
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

  const upcomingSlots = slots?.filter(
    (slot) => new Date(slot.startTime) > new Date()
  );

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
                        {upcomingSlots?.length || 0}
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
                  {upcomingSlots?.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{slot.topic}</p>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            {format(new Date(slot.startTime), "PPp")} -{" "}
                            {format(new Date(slot.endTime), "p")}
                          </p>
                          <p>Mentor: {slot.mentor?.username || "TBA"}</p>
                          <p>Available Spots: {slot.maxParticipants}</p>
                        </div>
                      </div>
                      {user?.role === "student" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => bookSlotMutation.mutate(slot.id)}
                          disabled={bookSlotMutation.isPending}
                        >
                          {bookSlotMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Book Slot
                        </Button>
                      )}
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
                            {format(result.completedAt ? new Date(result.completedAt) : new Date(), "PPp")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {result.score}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}