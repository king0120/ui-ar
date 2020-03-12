declare module "*.gql" {
    import {DocumentNode} from "graphql";
    const value: {
        [key: string]: DocumentNode,
    };
    export = value;
}
