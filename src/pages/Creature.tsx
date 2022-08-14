import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { ICreaturesGetSchema } from "../lib/openAPI";
import { buildGetResource } from "../lib/getResource";
import { useResource } from "../lib/useResource";
import { buildBugReportUrl } from "../lib/bugReportForm";
import { ESearchEndPoints } from "../lib/endpoints";
import creatureFields from "../lib/creatureFields";

import TagsPills from "../components/TagsPills";
import jsonLD from "../lib/jsonLD";
import { MuiSafeLink } from "../components/MuiRouterLink";

import BugReportIcon from "@mui/icons-material/BugReport";

import SafeIcon from "../components/SafeIcon";

const fetchCreature = buildGetResource<ICreaturesGetSchema>(
  ESearchEndPoints.creatures
);

const STATE_FIELDS = ["health", "attack", "intelligence", "defense", "speed"];

export default function Creatures() {
  const { result: creature } = useResource<ICreaturesGetSchema>(fetchCreature);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  return creature ? (
    <>
      <Helmet>
        <title>
          Creature {creature.name} - {creature.race.name} -{" "}
          {creature.klass.name} | Siralim Ultimate Unofficial Codex
        </title>
        <meta
          name="description"
          content={`Creatures ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}
        />
        <link
          rel="canonical"
          href={`https://${window.location.hostname}/creatures/${creature.slug}`}
        ></link>
        <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>

        <meta property="og:type" content="article" />
        <meta
          property="og:site_name"
          content="Siralim Ultimate Unofficial Codex"
        />
        <meta property="og:title" content={creature.name} />
        <meta
          property="og:url"
          content={`https://${window.location.hostname}/creatures/${creature.slug}`}
        />
        <meta
          property="og:description"
          content={`Siralim Ultimate Creature ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@thylastudios" />
        <meta
          name="twitter:url"
          content={`https://${window.location.hostname}/creatures/${creature.slug}`}
        />
        <meta name="twitter:title" content={creature.name} />
        <meta
          name="twitter:description"
          content={`Siralim Ultimate Creature ${creature.name} - ${creature.race.name} - ${creature.klass.name} | Siralim Ultimate Unofficial Codex`}
        />
      </Helmet>
      <Box sx={{ padding: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h2" align="center">
              {creature.name}
              <MuiSafeLink
                href={buildBugReportUrl({
                  dataType: "Creatures",
                  target: creature.name,
                })}
              >
                <BugReportIcon />
              </MuiSafeLink>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <img
                      width="256"
                      style={{ maxWidth: "100%" }}
                      src={creature.battle_sprite}
                      alt={`${creature.name} Battle Sprite`}
                      aria-hidden="true"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <img
                      src={creature.klass.icon}
                      width="64"
                      style={{ maxWidth: "100%" }}
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
                      width="64"
                      style={{ maxWidth: "100%" }}
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Table style={{ marginBottom: "1em" }}>
              <TableHead>
                <TableRow>
                  {STATE_FIELDS.map((key) => creatureFields[key]).map(
                    ({ icon, label, abbr }) => (
                      <TableCell align="center">
                        <SafeIcon
                          icon={icon}
                          name={label}
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        {isLg ? label : abbr || label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{creature.health}</TableCell>
                  <TableCell align="center">{creature.attack}</TableCell>
                  <TableCell align="center">{creature.intelligence}</TableCell>
                  <TableCell align="center">{creature.defense}</TableCell>
                  <TableCell align="center">{creature.speed}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h4" component="h3" gutterBottom>
              Trait: {creature.trait.name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {creature.trait.description}
            </Typography>
            {creature.trait.tags.length > 0 && (
              <Box sx={{ padding: "0.5em 0px" }}>
                <TagsPills tags={creature.trait.tags} />
              </Box>
            )}
            <Typography variant="body1" component="p" gutterBottom>
              Sources: {creature.sources.map(({ name }) => name).join(" | ")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    <></>
  );
}
