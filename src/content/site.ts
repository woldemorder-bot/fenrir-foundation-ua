export type ProjectSlug =
  | "dronski"
  | "eyes-of-fenrir"
  | "odins-comms"
  | "wheels-of-north"
  | "viking-medkit"
  | "pilot-school";

export type Localized = { uk: string; en: string };

export const projectSlugs: ProjectSlug[] = [
  "dronski",
  "eyes-of-fenrir",
  "odins-comms",
  "wheels-of-north",
  "viking-medkit",
  "pilot-school",
];

export const projects: Record<
  ProjectSlug,
  {
    goalUah: number;
    raisedUah: number;
    title: Localized;
    short: Localized;
  }
> = {
  dronski: {
    goalUah: 2_500_000,
    raisedUah: 1_180_000,
    title: { uk: "Дронскі: FPV", en: "Dronski: FPV" },
    short: {
      uk: "FPV-комплекти та навчання для ударних підрозділів.",
      en: "FPV kits and training for strike units.",
    },
  },
  "eyes-of-fenrir": {
    goalUah: 1_800_000,
    raisedUah: 920_000,
    title: { uk: "Очі Фенріра", en: "Eyes of Fenrir" },
    short: {
      uk: "Розвідка: тепловізори, оптика, стаціонарні пости.",
      en: "Recon: thermal optics, glass, observation posts.",
    },
  },
  "odins-comms": {
    goalUah: 1_200_000,
    raisedUah: 640_000,
    title: { uk: "Зв'язок Одіна", en: "Odin's Comms" },
    short: {
      uk: "Радіозв'язок, шифровані канали, резервні мережі.",
      en: "Radio comms, encrypted channels, resilient networks.",
    },
  },
  "wheels-of-north": {
    goalUah: 3_200_000,
    raisedUah: 1_450_000,
    title: { uk: "Колеса півночі", en: "Wheels of the North" },
    short: {
      uk: "Транспорт, ремонт, запчастини для мобільних груп.",
      en: "Vehicles, maintenance, spare parts for mobile groups.",
    },
  },
  "viking-medkit": {
    goalUah: 900_000,
    raisedUah: 510_000,
    title: { uk: "Аптечка вікінга", en: "Viking Medkit" },
    short: {
      uk: "Тактична медицина, евакуаційні носилки, стабілізація.",
      en: "Tactical medicine, litters, stabilization.",
    },
  },
  "pilot-school": {
    goalUah: 1_500_000,
    raisedUah: 380_000,
    title: { uk: "Школа пілотів", en: "Pilot School" },
    short: {
      uk: "Курси операторів БПЛА та інструкторів.",
      en: "UAV operator and instructor courses.",
    },
  },
};

export const homeStats = {
  deliveredUah: 47_800_000,
  drones: 1280,
  vehicles: 86,
  units: 214,
} as const;

export const partnerSlots = 12;

export function isProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}
