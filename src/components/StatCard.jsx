import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ value, label }) => {
  return (
    <Card className="bg-card border-border text-center">
      <CardContent className="p-8">
        <div className="text-4xl md:text-5xl font-bold text-gradient-cyan-purple mb-2">
          {value}
        </div>
        <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
          {label}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;