import {gql} from '@apollo/client';
 
export const get_all = gql`
    query ($filter: CountryFilterInput) {
        countries(filter: $filter) {
            code
            name
            currency
            capital
            continent {
                name
            }
            languages {
                name
            }
        }
        continents {  
            code 
            name
        }
    }
`;

// export const get_languages = gql`
//     query {
//         languages {
//             code
//             name
//         }
//     }
// `;