import {IVisitingClub} from "~/interfaces/IVisitingClub";
import {IInvoiceAgreement} from "~/interfaces/IInvoiceAgreement";
import {IFeaturedClub} from "~/interfaces/IFeaturedClub";
import {IHomeClub} from "~/interfaces/IHomeClub";

export interface IMatch {
    id: number
    date: string
    endDate: string
    originalEndDate: string
    score: any
    stadium: string
    specialEventHomeClub: any
    specialEventAwayClub: string
    kitId: number
    published: boolean
    finished: boolean
    featured: boolean
    worn: boolean
    checkedFinishing: boolean
    homeClubId: number
    homeClub: IHomeClub
    visitingClubId: number
    visitingClub: IVisitingClub
    featuredClubId: number
    featuredClub: IFeaturedClub
    invoiceAgreementId: number
    invoiceAgreement: IInvoiceAgreement
}
