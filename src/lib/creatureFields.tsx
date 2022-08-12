import HealthPng from "../images/stats/health.png";
import AttackPng from "../images/stats/attack.png";
import DefensehPng from "../images/stats/defense.png";
import IntelligencePng from "../images/stats/intelligence.png";
import SpeedPng from "../images/stats/speed.png";
import { ESearchEndPoints } from "./endpoints";
import { IField } from "../components/filters/types";

const creatureFields: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: ESearchEndPoints.creatures },
  klass_name: {
    type: "string",
    label: "Class",
    resource: ESearchEndPoints.classes,
  },
  race_name: {
    type: "string",
    label: "Race",
    resource: ESearchEndPoints.races,
  },
  trait_name: {
    type: "string",
    label: "Trait",
    resource: ESearchEndPoints.traits,
  },
  health: { abbr: "HP", type: "number", label: "Health", icon: HealthPng },
  attack: { abbr: "ATK", type: "number", label: "Attack", icon: AttackPng },
  intelligence: {
    abbr: "INT",
    type: "number",
    label: "Intelligence",
    icon: IntelligencePng,
  },
  defense: { abbr: "DEF", type: "number", label: "Defense", icon: DefensehPng },
  speed: { abbr: "SPD", type: "number", label: "Speed", icon: SpeedPng },
  trait_tags: {
    type: "string_array",
    label: "Tags",
  },
};

export default creatureFields;
