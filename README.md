# CypherProductsBackend
Node backend with GraphQL API implementation

## API Link:
* https://cypher-products-api.herokuapp.com/api

## API Documentation:

### Add Products:
```
mutation{
  createProducts(productInput:{
    name: [String],
    description: [String],
    quantity: [Int],
    price: [Float]
  }){
    name
  }
}
```

### Query all products:
```
query {
  products{
    name
    description
    price
    quantity
  }
}
```

__Tip__: Use ``` CTRL + Space ``` to get more info about the fields on the API Playground.
