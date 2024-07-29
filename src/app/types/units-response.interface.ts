import Location from './location.interface';

export default interface UnitsResponse {
  current_country_id: number;
  locations: Location[];
}
