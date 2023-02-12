# TcukawiWa - Open Source Whatsapp Bot

TcukawiWa is an open-source Whatsapp bot built using [@open-wa/wa-automate](https://github.com/open-wa/wa-automate) and [@discordjs/collection](https://github.com/discordjs/collection) for the command handler. It is designed to automate various tasks and help you interact with your contacts on Whatsapp in a convenient and efficient manner.

## Installation

Installing TcukawiWa is easy, simply follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/MoonLGH/TcukawiWa.git`
2. Navigate to the TcukawiWa directory using `cd TcukawiWa`
3. Run `npm i` to install the dependencies
4. Create a .env file and include the following environment variables:
   - Secret (optional) - for the #genshinclaim command, should be in the format `{"env":{"token":"token","account_id":"id","uid":"uid"}}`
   - Licenses - @open-wa licenses that you have bought/obtained
   - MongoURL - the MongoDB URL to connect to your database
   - OPENAI - the OpenAI API key obtained from https://openai.com/api/ to use the #ai command
   - Sauce_API - the SauceNao API key obtained from https://saucenao.com/user.php to use the #sauce command
5. Start the bot by running `npm run start`

## Technology Stack

TcukawiWa is built using [Node.js](https://nodejs.org/), a JavaScript runtime environment, and [@open-wa/wa-automate](https://github.com/open-wa/wa-automate), a library for automating Whatsapp chats.

## Contributions

TcukawiWa is an open-source project and contributions are welcome. If you would like to contribute, please follow these steps:

1. Fork this repository
2. Create your feature branch using `git checkout -b my-new-feature`
3. Commit your changes using `git commit -am 'Add some feature'`
4. Push to the branch using `git push origin my-new-feature`
5. Create a new Pull Request

## License

TcukawiWa is licensed under the [MIT License](LICENSE).
