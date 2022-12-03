export interface UsersPerDayResponse {
  creationDate: string,
  newUsersPerDay: [
    {courseName: string, date: string, users: number}
  ]
}
