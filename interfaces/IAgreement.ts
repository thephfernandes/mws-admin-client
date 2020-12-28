import {ISeller} from "~/interfaces/ISeller";

export interface IAgreement {
    id: number
    name: string
    thirdPartyVatPercentage: number
    paymentHandlingPercentage: number
    shippingInsurancePercentage: number
    shippingFlatFee: number
    mwsHandlingPercentage: number
    mwsAuctionPercentage: number
    mwsVatPercentage: number
    mwsSetupFee: number
    sellerId: number
    seller: ISeller
    clubId: number
    club: any
}
