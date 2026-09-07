import dbConnect from "@/lib/db";
import { AssessmentAttempt } from "@/models/AssessmentAttempt";
import { Assessment } from "@/models/Assessment";
import { Users, FileCheck, Target } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Ensures the dashboard is always up-to-date

async function getDashboardData() {
  await dbConnect();
  
  // Get counts
  const totalAssessments = await Assessment.countDocuments();
  const totalAttempts = await AssessmentAttempt.countDocuments();
  
  // Get recent attempts (populate the assessment details if needed, or join manually)
  const recentAttempts = await AssessmentAttempt.find()
    .sort({ startedAt: -1 })
    .limit(10)
    .populate('assessmentId', 'title slug')
    .lean() as any[];

  // Calculate average score
  const allAttempts = await AssessmentAttempt.find().select('score').lean();
  const avgScore = allAttempts.length > 0 
    ? Math.round(allAttempts.reduce((acc, curr) => acc + curr.score, 0) / allAttempts.length)
    : 0;

  return {
    totalAssessments,
    totalAttempts,
    avgScore,
    recentAttempts
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Assessments</h3>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <FileCheck className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.totalAssessments}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Completions</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.totalAttempts}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.avgScore}%</div>
        </div>
      </div>

      {/* Recent Attempts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Completions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentAttempts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                    No attempts found. Take an assessment first!
                  </td>
                </tr>
              ) : (
                data.recentAttempts.map((attempt) => (
                  <tr key={attempt._id.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {attempt.assessmentId?.title || "Unknown Assessment"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(attempt.startedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${attempt.score >= 80 ? 'bg-green-100 text-green-800' : 
                          attempt.score >= 60 ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {attempt.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attempt.resultCategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/assessment/${attempt.assessmentId?.slug}/result/${attempt._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
