export interface MissionVissionItem {
    id: number;
    header: string;
    description: string;
}

const MissVision: MissionVissionItem[] = [
     {
    id: 1,
    header: "Our Mission",
    description: `ACUSA aims to foster leadership, accountability, and service
                while creating an inclusive campus culture, advocating for
                student growth, enhance communication with the administration,
                ensuring  students needs are met through engagement and
                representation.`,
  },
  {
    id: 2,
    header: "Our Vision",
    description: `To be a leading student body that champions student interests,
                promotes academic excellence, and nurtures a vibrant university
                experience through effective governance and representation.`,
  },
]

export { MissVision };