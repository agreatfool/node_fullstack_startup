# Swagger

## Intro
A cli helper for [swagger-typescript-codegen](https://github.com/mtennoe/swagger-typescript-codegen). Provides the functionality to generate client ts codes from swagger json|yaml.

## Wrapper
Using [swagger-typescript-codegen](https://github.com/mtennoe/swagger-typescript-codegen) to generate client ts codes. 

## Notes
Currently (3.0.1) there is a critical bug: [Property 'default' does not exist on type 'SuperAgentStatic' #98](https://github.com/mtennoe/swagger-typescript-codegen/issues/98).

So using custom template file, placed at: `src/templates/*`. Codes executed at `build/index.js` would using templates `../src/templates/*` to generate client codes. Currently there is no script to sync templates files from `src` to `build`.

## Usage

