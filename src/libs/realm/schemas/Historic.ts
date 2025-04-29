import { Realm } from '@realm/react';
import { CoordsSchemaProps } from './Coords';

type GenerateProps = {
  user_id: string;
  description: string;
  license_plate: string;
  coords: CoordsSchemaProps[];
};

export class Historic extends Realm.Object<Historic> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  license_plate!: string;
  coords!: CoordsSchemaProps[];
  description!: string;
  status!: string;
  created_at!: Date;
  update_at!: Date;

  static generate({
    description,
    license_plate,
    user_id,
    coords,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      description,
      coords,
      license_plate,
      user_id,
      status: 'departure',
      created_at: new Date(),
      update_at: new Date(),
    };
  }

  static schema: Realm.ObjectSchema = {
    name: 'Historic',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: 'Coords',
      },
      status: 'string',
      created_at: 'date',
      update_at: 'date',
    },
  };
}
