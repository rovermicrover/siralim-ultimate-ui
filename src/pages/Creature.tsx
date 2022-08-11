import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { ICreaturesGetSchema } from "../lib/openAPI";
import { buildGetResource } from "../lib/getResource";
import { useResource } from "../lib/useResource";
import { buildBugReportUrl } from "../lib/bugReportForm";
import { ESearchEndPoints } from "../lib/endpoints";

import TagsPills from "../components/TagsPills";
import jsonLD from "../lib/jsonLD";
import { MuiSafeLink } from "../components/MuiRouterLink";

import BugReportIcon from "@mui/icons-material/BugReport";

import HealthPng from "../images/stats/health.png";
import AttackPng from "../images/stats/attack.png";
import DefensehPng from "../images/stats/defense.png";
import IntelligencePng from "../images/stats/intelligence.png";
import SpeedPng from "../images/stats/speed.png";
import { create } from "domain";

const fetchCreature = buildGetResource<ICreaturesGetSchema>(
  ESearchEndPoints.creatures
);

export default function Creatures() {
  const { result: creature } = useResource<ICreaturesGetSchema>(fetchCreature);

  return creature ? (
    <>
      <Helmet>
        <title>
          Creature {creature.name} - {creature.race.name} - {creature.klass.name} | Siralim Ultimate Unofficial Codex
        </title>
        <meta
          name="description"
          content={`Creatures ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}
        />
        <link rel="canonical" href={`https://${window.location.hostname}/creatures/${creature.slug}`}></link>
        <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>

        <meta property="og:type" content="article"/>
        <meta property="og:site_name" content="Siralim Ultimate Unofficial Codex"/>
        <meta property="og:title" content={creature.name}/>
        <meta property="og:url" content={`https://${window.location.hostname}/creatures/${creature.slug}`}/>
        <meta property="og:description" content={`Siralim Ultimate Creature ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@thylastudios"/>
        <meta name="twitter:url" content={`https://${window.location.hostname}/creatures/${creature.slug}`}/>
        <meta name="twitter:title" content={creature.name}/>
        <meta name="twitter:description" content={`Siralim Ultimate Creature ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}/>
      </Helmet>
      <Table>
        <TableBody>
          <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
            <TableCell colSpan={7}>
              <Typography variant="h3" component="h2">
                {creature.name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
            <TableCell align="center" sx={{ width: "32px" }}>
              <Table>
                <TableBody>
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset !important" } }}
                  >
                    <TableCell colSpan={2}>
                      <img
                        width="256"
                        height="256"
                        src={creature.battle_sprite}
                        alt={`${creature.name} Battle Sprite`}
                        aria-hidden="true"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset !important" } }}
                  >
                    <TableCell align="center">
                      <img
                        src={creature.klass.icon}
                        height="64"
                        width="64"
                        alt={`${creature.name} Klass Icon ${creature.klass.name}`}
                        aria-hidden="true"
                      />
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        {creature.klass.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={creature.race.icon}
                        height="64"
                        width="64"
                        alt={`${creature.name} Race Icon ${creature.race.name}`}
                        aria-hidden="true"
                      />
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        {creature.race.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
            <TableCell colSpan={5}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <img src={HealthPng} alt={"health"} />
                    </TableCell>
                    <TableCell align="center">
                      <img src={AttackPng} alt={"attack"} />
                    </TableCell>
                    <TableCell align="center">
                      <img src={IntelligencePng} alt={"intelligence"} />
                    </TableCell>
                    <TableCell align="center">
                      <img src={DefensehPng} alt={"defense"} />
                    </TableCell>
                    <TableCell align="center">
                      <img src={SpeedPng} alt={"speed"} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">{creature.health}</TableCell>
                    <TableCell align="center">{creature.attack}</TableCell>
                    <TableCell align="center">
                      {creature.intelligence}
                    </TableCell>
                    <TableCell align="center">{creature.defense}</TableCell>
                    <TableCell align="center">{creature.speed}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
            <TableCell colSpan={7} style={{ paddingTop: 0 }}>
              <Typography variant="h4" component="h3">
                Trait: {creature.trait.name}
              </Typography>
              <Typography variant="body1" component="div">
                {creature.trait.description}
              </Typography>
            </TableCell>
          </TableRow>
          {creature.trait.tags.length > 0 && (
            <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
              <TableCell colSpan={6} style={{ paddingTop: 0 }}>
                <TagsPills tags={creature.trait.tags} />
              </TableCell>
            </TableRow>
          )}
          <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
            <TableCell colSpan={6} style={{ paddingTop: 0 }}>
              <Typography variant="body1" component="div">
                Sources: {creature.sources.map(({ name }) => name).join(" | ")}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} style={{ paddingTop: 0 }}>
              <MuiSafeLink
                href={buildBugReportUrl({
                  dataType: "Creatures",
                  target: creature.name,
                })}
              >
                <BugReportIcon />
              </MuiSafeLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  ) : (
    <></>
  );
}
