interface JobScraping {
  scrapTitle(): Promise<void>;
  scrapPosition(): Promise<void>;
  scrapRequirement(): Promise<void>;
  scrapStratDate(): Promise<void>;
  scrapEndDate(): Promise<void>;
  getJobScrap(): JobScrap;
  getLinks(): Promise<any>;
}

interface JobScrap {
  company: string;
  title: string;
  position: string;
  requirement: string;
  stratDate: string;
  endDate: string;
  link: string;
}

export { JobScrap, JobScraping };
