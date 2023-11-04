interface JobScraping {
  scrapCompany(): void;
  scrapPosition(): void;
  scrapRequirement(): void;
  scrapStratDate(): void;
  scrapEndDate(): void;
  getJobScrap(): JobScrap;
}

interface JobScrap {
  company: string;
  position: string;
  requirement: string;
  stratDate: string;
  endDate: string;
  link: string;
}

export { JobScrap, JobScraping };
