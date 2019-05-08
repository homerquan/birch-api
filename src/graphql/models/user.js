/* @flow */

import { Schema, model, type ObjectId } from 'mongoose';
import { composeWithMongoose } from '../schemaComposer';

const LanguagesSchema = new Schema(
  {
    language: String,
    skill: {
      type: String,
      enum: ['basic', 'fluent', 'native'],
    },
  },
  {
    _id: false, // disable `_id` field for `Language` schema
  }
);

const AddressSchema = new Schema({
  street: String,
  geo: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2dsphere', // create the geospatial index
  },
});

export const UserSchema: Schema<UserDoc> = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    age: {
      type: Number,
      index: true,
    },
    languages: {
      type: [LanguagesSchema], // you may include other schemas (also as array of embedded documents)
      default: [],
    },
    contacts: {
      // another mongoose way for providing embedded documents
      email: String,
      phones: [String], // array of strings
    },
    gender: {
      // enum field with values
      type: String,
      enum: ['male', 'female', 'ladyboy'],
    },
    address: {
      type: AddressSchema,
    },
    someMixed: {
      type: Schema.Types.Mixed,
      description: 'Some dynamic data',
    },
  },
  {
    collection: 'user_users',
  }
);

// Just a demo how to annotate mongoose models in Flowtype
// But better to use TypeScript & Decorators with `typegoose` package.
export class UserDoc /* :: extends Mongoose$Document */ {
  // $FlowFixMe
  _id: ObjectId;

  name: string;

  age: number;

  languages: Array<{
    language: string,
    skill: 'basic' | 'fluent' | 'native',
  }>;

  contacts: {
    email: string,
    phones: string[],
  };

  gender: 'male' | 'female' | 'ladyboy';
}

UserSchema.index({ gender: 1, age: -1 });

export const User = model('User', UserSchema);

export const UserTC = composeWithMongoose<UserDoc>(User);

UserTC.addFields({
  virtualField: {
    type: 'String',
    args: {
      lang: 'String',
    },
    resolve: (source, args, context, info) => {
      // following vars have autocompletion (excepts args in Flow)
      return source.contacts.email + context.ip + info.fieldName;
    },
  },
});

UserTC.setResolver(
  'findMany',
  UserTC.getResolver('findMany').addFilterArg({
    name: 'geoDistance',
    type: `input GeoDistance {
      lng: Float!
      lat: Float!
      # Distance in meters
      distance: Float!
    }`,
    description: 'Search by distance in meters',
    query: (rawQuery, value) => {
      if (!value.lng || !value.lat || !value.distance) return;
      // read more https://docs.mongodb.com/manual/tutorial/query-a-2dsphere-index/
      rawQuery['address.geo'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [value.lng, value.lat],
          },
          $maxDistance: value.distance, // <distance in meters>
        },
      };
    },
  })
  // /* FOR DEBUG */
  //   .debug()
  // /* OR MORE PRECISELY */
  //   .debugParams()
  //   .debugPayload()
  //   .debugExecTime()
);