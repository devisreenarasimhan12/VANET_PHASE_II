import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, MapPin } from 'lucide-react';

interface ComplainedArea {
  id: string;
  name: string;
  userCount: number;
  percentage: number;
  color: string;
  complaintType: 'fire' | 'flood' | 'structural' | 'medical' | 'other';
}

interface SurvivorZonesChartProps {
  zones: ComplainedArea[];
}

const ComplainedAreasChart = ({ zones }: SurvivorZonesChartProps) => {
  const totalUsers = zones.reduce((sum, zone) => sum + zone.userCount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-panel border border-panel-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.userCount} complaints ({data.percentage}%)
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            Type: {data.complaintType.replace('_', ' ')}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="mt-4 space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.value}</span>
            </div>
            <div className="text-muted-foreground">
              {zones.find(z => z.name === entry.value)?.userCount} complaints
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full bg-panel border-panel-border">
      <CardHeader className="bg-panel-header border-b border-panel-border">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-emergency-info" />
          Complained Areas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {zones.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No complained areas detected</p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-3 bg-panel-header rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Complaints</span>
                <span className="font-mono font-bold text-lg text-emergency-info">
                  {totalUsers} complaints
                </span>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={zones}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="userCount"
                  >
                    {zones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <CustomLegend payload={zones.map(zone => ({ value: zone.name, color: zone.color }))} />

            <div className="mt-4 pt-4 border-t border-panel-border">
              <div className="grid grid-cols-1 gap-2">
                {zones.map((zone) => (
                  <div key={zone.id} className="flex items-center justify-between p-2 bg-panel-header/50 rounded">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{zone.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {zone.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplainedAreasChart;