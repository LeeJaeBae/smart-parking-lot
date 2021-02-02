import 'styled-components';
import {DefaultTheme} from "styled-components";

declare module 'styled-components' {
    export interface CustomTheme extends DefaultTheme {
        mobile: {
            width: string;
            height: string;
            border: string;
        }
        default: {
            width: string;
            height: string;
            border: string;
        }
    }
}