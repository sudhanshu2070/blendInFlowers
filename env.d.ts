/**
 * Module declaration for '@env'.
 * 
 * This module is used to provide type definitions for environment variables
 * that are imported from the '@env' module. In this case, it declares a single
 * environment variable `OPEN_WEATHER_API_KEY` which is a string.
 * 
 * Having this declaration helps TypeScript understand the types of the environment
 * variables being used in the project, providing better type safety and autocompletion
 * support in the development environment.
 */
declare module '@env' {
    export const OPEN_WEATHER_API_KEY: string;
  }