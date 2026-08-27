export type TellMeMore = {
  meaning: string;
  symbolism: string;
  why: string;
  background: string;
  other: string;
};

export type UpakarmaStep = {
  title: string;
  instruction: string;
  explanation: string;
  tellMeMore: TellMeMore;
  audio: {
    src: string;
    label: string;
    startTime?: number;
    endTime?: number;
  };
};
