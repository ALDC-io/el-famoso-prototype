"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsProps {
  testimonials: Array<{ quote: string; author: string; company: string }>;
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground italic mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
