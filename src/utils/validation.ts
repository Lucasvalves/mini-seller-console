export function getScoreColor(score:number): string {
  if (score >= 90) return "text-green-600 bg-green-50"
  if (score >= 75) return "text-blue-600 bg-blue-50"
  if (score >= 60) return "text-yellow-600 bg-yellow-50"
  return "text-red-600 bg-red-50"
}

export function getStatusColor(status:string): string {
  switch (status) {
    case "new":
      return "bg-gray-100 text-gray-800"
    case "contacted":
      return "bg-blue-100 text-blue-800"
    case "qualified":
      return "bg-green-100 text-green-800"
    case "unqualified":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
