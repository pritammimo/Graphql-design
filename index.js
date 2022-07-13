const {ApolloServer,gql}=require("apollo-server");
const typeDefs=gql`
type Query{
    cars:[Car!]!
}
type Mutation{
    groupDelete(groupId:ID!)
    groupPublish(groupId:ID!)
    groupunpublish(groupId:ID!)
    groupaddCars(groupId:ID!,carID:ID!)
    groupremoveCars(groupId:ID!,carID:ID!)
    groupcreate(
        name:String!
        image:ImageInput!
        description:String!
        featureSet:GroupFeatureFields
    )
    groupupdate(
        groupId:ID!
        groupInput:GroupInput!
    ):Group
}
type GroupUpdatePayload{
    userErrors:[UserErrors!]!
    group:Group
}
type UserErrors{
 message:String!
 field:[String!]!
}
input ImageInput{
 url:String!
}
input GroupInput{
    name:String
    image:ImageInput
    description:String
    featureSet:GroupFeatureFields
}
type Car{
    id:ID!
    color:String!
    make:String!
}
type Group{
    id:ID!
    feaureSet:GroupFeatureSet
    cars(skip:Int!,take:Int!):[Car!]!
    hasCar(id:ID!):Boolean!
    name:String!
    image:Image!
    description:String!
}
type Image {
    id:ID!
    url:String!
}
type GroupFeatureSet{
    features:[GroupFeatures!]!
    applyFeaturesSeperately:Boolean!
}
type GroupFeatures{
  feature:GroupFeatureFields!
}
enum GroupFeatureFields{
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
}




`
const server=new ApolloServer({
    typeDefs,
    resolvers:{
        Query:{
            cars:()=>[{id:1,color:"blue",nake:"Toyota"}]
        }
    }
})
server.listen().then(({url})=>{
    console.log("Server is ready at" + url)
})