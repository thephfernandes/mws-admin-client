export default class Framing {
    ID: number = 0;
    IsActivated: boolean = false;
    PassePartoutOptionID: number = 0;
    BorderColorOptionID: number = 0;
    PlateOptionID: number = 0;
    HasLogoOnPlate: boolean = false;
    HasLogoOnTop: boolean = false;
    HasVisibleSleeves: boolean = false;
    StandaloneFramingStatus: number = 0;
    StandaloneText: string = '';
    OrderID: number = 0;
    StandaloneCreationDate: string = '';
    StandaloneName: string = '';
    StandaloneHome: string = '';
    StandalonePhone: string = '';
    StandaloneEmail: string = '';
    StandaloneShipmentIdentificationNumber: number = 0;
    StandaloneTrackingNumber: string = '';
    StandalonePickupID: number = 0;
    StandaloneShippingStatus: number = 0;
    StandaloneCity: string = '';
    StandalonePostCode: string = '';
    StandaloneCountry: string = '';
    StandaloneCompany: string = '';
    StandaloneShippingCosts: number = 0;
    NumberOfCustomPics: number = 0;
    IsBackSide: boolean = false;
    WinnerName: string = '';
    OrderFramingStatus: number = 0;
    OrderInitialCreationDate: string = '';

    constructor() {}
}
