# ClassicRealmsBuddy

A stupid simple interface to request your favorite WoW Classic realm status.

## Dependencies

- Puppeteer: scrapes the Blizzard page for the latest realm statuses
- Node.js
- Yarn

## Use

Very basic at the moment. This is a WIP after all.

```text
cd clonedProjectDir
node index.js

Please input realm name in command line.
Kromcrush
{ realmName: 'Kromcrush', realmType: 'PvP', realmPop: 'High' }

SomeFakeRealm does not exist. Please try again or type "exit" to exit
[
  'Anathema',            'Arcanite Reaper',
  'Arugal',              'Ashkandi',
  'Atiesh',              'Azuresong',
  'Benediction',         'Bigglesworth' ,...
]
```