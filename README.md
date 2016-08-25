# PLM-profiles

This application is used to store the profile of the users of [webPLM](https://github.com/buggleinc/webplm).
It also allows to link their identity to the *git ID* used to get their branch of [PLM-data](https://github.com/buggleinc/plm-data).

This application has been developed using the [MEAN](http://meanjs.org/) stack.


## Model

Here is the model of **Profile**:

```javascript
/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  loginInfo: {
    providerID: {
      type: String,
      trim: true
    },
    providerKey: {
      type: String,
      trim: true
    }
  },
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  lastProgLang: {
    type: String,
    trim: true
  },
  preferredLang: {
    code: {
      type: String,
      trim: true
    }
  },
  avatarURL: {
    type: String,
    trim: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  gitID: {
    type: String,
    trim: true
  },
  trackUser: {
    type: Boolean
  }
});
```

## API

#### Create a new profile

```POST /api/profiles```

#### Retrieve an existing profile

```GET /api/profiles/:providerID/:providerKey```

#### Update an existing profile

```PUT /api/profiles/:providerID/:providerKey```

#### Delete an existing profile

```DELETE /api/profiles/:providerID/:providerKey```

#### Response

In all cases, the response body will be the profile *created/read/updated/deleted*.

````javascript
{
  "gitID": "5b0e696e-f17a-4cf0-95b2-dfdd0983e21f",
  "fullName": "John Doe",
  "avatarURL": "http://example.com/path/to/avatar",
  "email": "john@example.com",
  "updated": "2016-08-24T16:03:05.465Z",
  "lastProgLang": "Java",
  "created": "2016-08-24T15:59:12.149Z",
  "preferredLang": {
    "code": "en"
  },
  "loginInfo": {
    "providerID": "provider",
    "providerKey": "774970574812855824109"
  }
}
````

## License

Copyright (C) 2016 INRIA

PLM-profiles is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

PLM-profiles is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with PLM-profiles.  If not, see <http://www.gnu.org/licenses/>.
