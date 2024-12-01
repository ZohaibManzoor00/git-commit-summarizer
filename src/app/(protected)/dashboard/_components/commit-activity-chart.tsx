import { type FC } from "react"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Commit = {
  name: string, 
  commits: number 
}

interface CommitActivityChartProps {
  commitsByWeekName?: Commit[]
}

const CommitActivityChart: FC<CommitActivityChartProps> = ({ commitsByWeekName }) => {
  return (
    <Card className="h-full shadow-none">
      <CardHeader>
        <CardTitle>Commit Activity</CardTitle>
        <CardDescription>Total commit history over the past week</CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={commitsByWeekName}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Line type="monotone" dataKey="commits" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommitActivityChart
