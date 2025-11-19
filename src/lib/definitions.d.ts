type TActionModalProps = {
  children?: ReactNode;
  description: string;
  title: string;
  trigger?: ReactNode;
  wrapperStyles: string;
  footerContent?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type TLayoutProps = {
  children: ReactNode;
};

type TextSizes =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl";

type TAnalyticCardProps = {
  title: string;
  content: ReactNode;
  extraStyles: string;
  titleStyles?: string;
  contentStyles?: string;
};

type TRouteStatus = {
  routeName: string;
  status: "low" | "medium" | "high";
  numberOfVehicles: number;
};

type TNextButtonProps = {
  swipingButtonRefNext: any;
};

type TPrevButtonProps = {
  swipingButtonRefPrev: any;
};

type TChartProps = {
  chartData: any[];
  chartOptions: any;
};

type TClientFeedback = {
  clientImageUrl: string;
  clientName: string;
  clientRole: string;
  rating: number;
  message: string;
  route: string;
  timeTaken: string;
};

type TResultData = {
  tag: "intersection" | "camera" | "micro-processor";
  content: string;
};

type TSearchHistoryItem = {
  content: string;
  searchDate: string;
};

type TNotification = {
  date: string;
  tag: "intersection" | "camera" | "micro-processor" | "feedback";
  content: string;
  imgUrl?: string;
};

type TUserRole = {
  name: string;
  source: string;
};

type TUser = {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string | undefined;
  roles: TUserRole[];
};

type CustomFormFieldProps = {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  inputStyles?: string;
  formItemStyles?: string;
  type?: HTMLInputTypeAttribute;
  wrapperStyles?: string;
  variant?: "filled" | "outlined";
  labelStyles?: string;
};

type TTrafficCamera = {
  camNo: number;
  routeName: string;
};

type TUserData = {
  id: string;
  profile: {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string;
    userId: string;
  };
  email: string;
  username: string;
  status: string;
  permissions?: TPermission[];
  roles?: TRole[];
};

type TParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
};

type TPermission = {
  active: boolean;
  description: string;
  id: string;
  slug: string;
};

type TRole = {
  active: boolean;
  id: string;
  name: string;
  permissions: TPermission[];
};

type TGeneralState<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};
type TUsersState = TGeneralState<TUserData> & {
  inViewUser: TUserData | null;
};

type TFormat = "table" | "grid";

type TRolesState = TGeneralState<TRole> & { format: TFormat };

type TPermissionsState = TGeneralState<TPermission>;
