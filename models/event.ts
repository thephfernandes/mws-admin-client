export default class Event {
    public id: number = 0;
    public home_club_id: number = 0;
    public home_club: string = '';
    public visiting_club_id: number = 0;
    public visiting_club: string = '';
    public featured_club_id: number = 0;
    public featured_club: number = 0;
    public date: string = '';
    public end_date: string = '';
    public score: Score = new Score();
    public stadium: string = '';
    public finished: boolean = false;
    public featured: boolean = false;
    public worn: boolean = false;
    public kit_id: number = 0;
    public charity_id: Charityid = new Charityid();
    public auto_publish_match_issued: boolean = false;
}

export class  Charityid {
    Int64: number = 0;
    Valid: boolean = false;
}

export class Score {
    String: string = '';
    Valid:  boolean = false;
}
