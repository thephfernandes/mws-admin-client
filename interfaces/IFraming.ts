export interface Framing {
    ID: number;
    IsActivated: boolean;
    PassePartoutOptionID: number;
    BorderColorOptionID: number;
    PlateOptionID: number;
    HasLogoOnPlate: boolean;
    HasLogoOnTop: boolean;
    HasVisibleSleeves: boolean;
    StandaloneFramingStatus: number;
    StandaloneText: string;
    OrderID: number;
    StandaloneCreationDate: string;
    StandaloneName: string;
    StandaloneHome: string;
    StandalonePhone: string;
    StandaloneEmail: string;
    StandaloneShipmentIdentificationNumber: number;
    StandaloneTrackingNumber: string;
    StandalonePickupID: number;
    StandaloneShippingStatus: number;
    StandaloneCity: string;
    StandalonePostCode: string;
    StandaloneCountry: string;
    StandaloneCompany: string;
    StandaloneShippingCosts: number;
    NumberOfCustomPics: number;
    IsBackSide: boolean;
    WinnerName: string;
    OrderFramingStatus: number;
    OrderInitialCreationDate: string;
}