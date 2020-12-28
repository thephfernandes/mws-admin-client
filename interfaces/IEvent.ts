export interface Event {
    id:                        number;
    home_club_id:              number;
    home_club:                 string;
    visiting_club_id:          number;
    visiting_club:             string;
    featured_club_id:          number;
    featured_club:             string;
    date:                      string;
    end_date:                  string;
    score:                     Score;
    stadium:                   string;
    finished:                  boolean;
    featured:                  boolean;
    worn:                      boolean;
    kit_id:                    number;
    charity_id:                Charityid;
    auto_publish_match_issued: boolean;
}

export interface Charityid {
    Int64: number;
    Valid: boolean;
}

export interface Score {
    String: string;
    Valid:  boolean;
}