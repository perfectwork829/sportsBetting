import {ITheme} from './theme';

export * from './components';
export * from './theme';

export interface IBet {
  id?: number;
  slip?: string;
  odds?: number;
  amount?: number;
  live?: number;
  bsplitter?: number,
  notes?: string;
  currency?: string;
  splitters?: string;
  status?: number;
  created_at?: Date;
  netProfit?: number;
  arrSplitters: Array;
  onPress?: (event?: any) => void;
}

export interface ICustomer {
  name?: string;
  id?: number;
  a_apply_pay1?: number;
  b_bitcoin1?: number;
  e_ethereum1?: number;
  c_card1?: number;  
  u_usdt1?: number;
  m_game_currency1?: number;

  a_apply_pay2?: number;
  b_bitcoin2?: number;
  e_ethereum2?: number;
  c_card2?: number;  
  u_usdt2?: number;
  m_game_currency2?: number;
  onPress?: (event?: any) => void;
}

export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  user: IUser;
  users: IUser[];
  handleUser: (data?: IUser) => void;
  handleUsers: (data?: IUser[]) => void;
  
  bets: IBet[];
  setBets: (data?: IBet[]) => void;
  bet: IBet;
  handleBet: (data?: IBet) => void;

  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;

  dashboardUpdated: boolean;
  setDashboardUpdated: (data?: boolean) => void;

  splitterUpdated: boolean;
  setSplitterUpdated: (data?: boolean) => void;

  newBetUpdated: boolean;
  setNewBetUpdated: (data?: boolean) => void;
}

export interface ITransaction {
  id?: number;
  type_money?: string;
  amount?: number;    
  customer_name?: string;
  type_net?: string;  
  description?: string;    
  created_at?: Date;
  updated_at?: Date;
  onPress?: (event?: any) => void;
}

