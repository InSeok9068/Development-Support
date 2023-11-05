interface JobScraping {
  scrapTitle(): Promise<void>;
  scrapPosition(): Promise<void>;
  scrapRequirement(): Promise<void>;
  scrapStratDate(): Promise<void>;
  scrapEndDate(): Promise<void>;
  scrapLink(): Promise<void>;
  getJobScrap(): JobScrap;
  getLinks(): Promise<any>;
}

interface JobScrap {
  company: string;
  title: string;
  position: string;
  requirement: string;
  stratDate: Date;
  endDate: Date;
  link: string;
}

export { JobScrap, JobScraping };
