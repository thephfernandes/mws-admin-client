export interface IMatch {
  CheckedFinishing: boolean
  Date: string
  EndDate: string
  FeaturedClubID: number
  FeaturedClubName: string
  Finished: boolean
  HomeClubID: number
  HomeClubName: string
  ID: number
  KitID: number
  Published: boolean
  Score: string
  SpecialEventAwayClub: string
  SpecialEventHomeClub: string
  SportMonksID: number
  Stadium: string
  VisitingClubID: number
  VisitingClubName: string
  Worn: boolean
  status: string
  localDate: string
  worn: string
}

export interface IStat {
  title: string
  icon: string
  name: string
  amount: string
}