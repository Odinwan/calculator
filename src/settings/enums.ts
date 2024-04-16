export enum EntityType {
	Client = 'client',
	Company = 'company',
}

export enum Gender {
	Male = 'male',
	Female = 'female',
}

export enum WorkType {
	FullTime = 'fullTime',
	PartTime = 'partTime',
	Any = 'any',
}

export enum PlaceType {
	Remote = 'remote',
	Local = 'local',
	Hybrid = 'hybrid',
	Any = 'any',
}

export enum CarType {
	Sedan = 'Sedan',
	Hatchback = 'Hatchback',
	SUV = 'SUV',
	Crossover = 'Crossover',
	Coupe = 'Coupe',
	Convertible = 'Convertible',
	Minivan = 'Minivan',
	Van = 'Van',
	Pickup = 'Pickup',
	Wagon = 'Wagon',
	Limousine = 'Limousine',
	Cabriolet = 'Cabriolet',
	Roadster = 'Roadster',
	SUVCoupe = 'SUV Coupe',
	TargaTop = 'Targa Top',
	Fastback = 'Fastback',
	Notchback = 'Notchback',
	ShootingBrake = 'Shooting Brake',
	Buggy = 'Buggy',
	CompactMPV = 'Compact MPV',
	MPV = 'MPV',
	Microvan = 'Microvan',
	PanelVan = 'Panel Van',
	ChassisCab = 'Chassis Cab',
	DoubleCab = 'Double Cab',
	ExtraCab = 'Extra Cab',
	SUVConvertible = 'SUV Convertible',
	OffRoadVehicle = 'Off-road Vehicle',
	RaceCar = 'Race Car',
	RallyCar = 'Rally Car',
	Prototype = 'Prototype',
	Other = 'Other',
}

export enum CompanyType {
	IP = 'ip',
	LLC = 'ooo',
}

export interface Enums {
	entity: typeof EntityType;
	gender: typeof Gender;
	workType: typeof WorkType;
	carType: typeof CarType;
	placeType: typeof PlaceType;
	companyType: typeof CompanyType;
}

const ENUMS:Enums = {
	entity: EntityType,
	gender: Gender,
	workType: WorkType,
	carType: CarType,
	placeType: PlaceType,
	companyType: CompanyType,
}

export default ENUMS
