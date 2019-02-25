import { Text } from '../../SVG/SVG.Classes';

export interface LegendOptions
{
    Space: number;  //Total Legend Size.
    Position: 'Top' | 'Left' | 'Bottom' | 'Right';
    Orientation: 'Horizontal' | 'Vertical';
    Style: Text;
}