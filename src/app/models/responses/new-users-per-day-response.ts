export interface NewUsersPerDayResponse {
  courseName: string,
  creationDate: Date,
  newUsersPerDay: [{
      date: Date,
      users: number,
    }]
}
