/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import fastify from "fastify";
import { logger } from "../utils/logger.js";

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Serenya</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Discord bot that allows you to force yourself to take a break." />
    <script src="https://cdn.nhcarrigan.com/headers/index.js" async defer></script>
  </head>
  <body>
    <main>
    <h1>Serenya</h1>
    <img src="https://cdn.nhcarrigan.com/new-avatars/serenya.png" width="250" alt="Serenya" />
    <section>
      <p>Discord bot that allows you to force yourself to take a break.</p>
      <a href="https://discord.com/oauth2/authorize?client_id=1408505202004463757" class="social-button discord-button" style="display: inline-block; background-color: #5865F2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px;">
        <i class="fab fa-discord"></i> Add to Server
      </a>
    </section>
    <section>
        <h2>Links</h2>
        <p>
            <a href="https://git.nhcarrigan.com/nhcarrigan/caelia">
                <i class="fa-solid fa-code"></i> Source Code
            </a>
        </p>
        <p>
            <a href="https://docs.nhcarrigan.com/">
                <i class="fa-solid fa-book"></i> Documentation
            </a>
        </p>
        <p>
            <a href="https://chat.nhcarrigan.com">
                <i class="fa-solid fa-circle-info"></i> Support
            </a>
        </p>
    </section>
    </main>
  </body>
</html>`;

/**
 * Starts up a web server for health monitoring.
 */
export const instantiateServer = (): void => {
  try {
    const server = fastify({
      logger: false,
    });

    server.get("/", (_request, response) => {
      response.header("Content-Type", "text/html");
      response.send(html);
    });

    server.listen({ port: 7066 }, (error) => {
      if (error) {
        void logger.error("instantiate server", error);
        return;
      }
      void logger.log("debug", "Server listening on port 7066.");
    });
  } catch (error) {
    if (error instanceof Error) {
      void logger.error("instantiate server", error);
      return;
    }
    void logger.error("instantiate server", new Error(String(error)));
  }
};
