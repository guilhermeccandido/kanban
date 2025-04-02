"use client";

import {
  BarChart,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Last updated: Today, 9:41 AM
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Tasks</h3>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              <Progress value={68} className="mt-3 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Completed</h3>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" /> 10% increase
                </span>{" "}
                from last week
              </p>
              <Progress value={50} className="mt-3 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">In Progress</h3>
              <Circle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 inline-flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" /> 5% decrease
                </span>{" "}
                from last week
              </p>
              <Progress value={4.5} className="mt-3 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Upcoming Due</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Next due: FYP Proposal (Sep 13)
              </p>
              <Progress value={75} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <h3 className="text-base font-medium">Project Progress</h3>
              <p className="text-sm text-muted-foreground">
                Task completion by project category
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm font-medium">Self-Project</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      8/12 tasks
                    </span>
                  </div>
                  <Progress value={66.7} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                      <span className="text-sm font-medium">EasyBoard</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      1/2 tasks
                    </span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-teal-500 mr-2"></span>
                      <span className="text-sm font-medium">KTodo</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      0/2 tasks
                    </span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-sm font-medium">FYP</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      2/2 tasks
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-amber-500 mr-2"></span>
                      <span className="text-sm font-medium">Trading</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      1/2 tasks
                    </span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <h3 className="text-base font-medium">Upcoming Deadlines</h3>
              <p className="text-sm text-muted-foreground">
                Tasks due in the next 30 days
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      FYP Proposal
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due in 2 days (Sep 13)
                    </p>
                  </div>
                  <Badge className="ml-auto" variant="outline">
                    FYP
                  </Badge>
                </div>

                <div className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      EasyBoard Project
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due in 14 days (Sep 14)
                    </p>
                  </div>
                  <Badge className="ml-auto" variant="outline">
                    EasyBoard
                  </Badge>
                </div>

                <div className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Mobile application
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due in 38 days (Nov 06)
                    </p>
                  </div>
                  <Badge className="ml-auto" variant="outline">
                    Selfie-Drone
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
