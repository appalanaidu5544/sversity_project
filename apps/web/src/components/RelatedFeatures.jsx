import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const RelatedFeatures = ({ features }) => {
  return (
    <section className="py-16 bg-card/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Explore Related Systems</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href}>
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                    {feature.title}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedFeatures;