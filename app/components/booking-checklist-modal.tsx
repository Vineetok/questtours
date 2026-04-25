"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/overlays/dialog';
import { Button } from '@/components/ui/inputs/button';
import { CheckCircle2, AlertTriangle, User, Map, FileText, CheckSquare, ArrowRight } from 'lucide-react';

interface BookingChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function BookingChecklistModal({ isOpen, onClose, onProceed }: BookingChecklistModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-gray-50 shrink-0 text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
            <CheckSquare className="text-blue-600 h-7 w-7" />
            What You MUST Have Before Booking a Tour or Seat (Current Market Standards)
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2 text-sm sm:text-base ml-10">
            Please review the industry-standard requirements before proceeding with your reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10">
          {/* Category 1 */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900 pb-2 border-b border-gray-100">
              <User className="h-5 w-5 text-blue-600" /> Category 1: Personal & Identification Details
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-600 pl-2">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Full Legal Name (as on government ID/passport):</strong> Required for legal identification.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Date of Birth / Age:</strong> Required to verify age restrictions and safety.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Gender / Salutation (Mr., Mrs., Ms., etc.):</strong> Required for booking records.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Nationality & Country of Residence:</strong> Required for visa and entry requirements.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Contact Info (email and phone number for WhatsApp updates):</strong> Required for itinerary updates and emergencies.</span>
              </li>
            </ul>
          </section>

          {/* Category 2 */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900 pb-2 border-b border-gray-100">
              <Map className="h-5 w-5 text-emerald-600" /> Category 2: Itinerary & Service Specifics
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-600 pl-2">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Travel Dates (arrival and departure):</strong> Required to schedule services.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Group Composition (number of adults, children with specific ages, infants, pets):</strong> Required for capacity and specialized accommodations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Specific Seat Requests:</strong> Required for passenger comfort. (Note: these are often handled via a separate link days before departure)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Accommodation Preferences (bed type, room location, cribs, adjoining rooms):</strong> Required to reserve appropriate room types.</span>
              </li>
            </ul>
          </section>

          {/* Category 3 */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900 pb-2 border-b border-gray-100">
              <FileText className="h-5 w-5 text-amber-600" /> Category 3: Legal, Financial, and Safety Declarations
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-600 pl-2">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Passport Details (number, issuing country, expiration date):</strong> Required for international border compliance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Travel Insurance Proof (covering medical expenses and evacuation):</strong> Required to mitigate liability and assure safety.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Health & Mobility (physical limitations, allergies, dietary restrictions):</strong> Required for safety and catering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Payment & Billing (credit card details, billing address, acknowledgment of T&Cs):</strong> Required to process transactions and enforce policies.</span>
              </li>
            </ul>
          </section>

          {/* Highlight Note */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6 flex gap-4 shadow-sm">
            <AlertTriangle className="h-8 w-8 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2 text-lg">The Shift to &apos;Multi-Guest Management&apos;</h4>
              <p className="text-blue-800 leading-relaxed">
                You must upload complete profiles (Name, DOB, Nationality) for each individual tourist, not just the primary booker, especially for flights, cruises, or international borders.
              </p>
            </div>
          </div>

          {/* Final Summary Checklist */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" /> Summary Checklist
            </h4>
            <p className="text-slate-600 mb-6">Ensure you have the following physical items/documents ready before clicking &quot;Book&quot;:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Scans/photos of passports for all travelers
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Travel insurance policy & emergency number
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Medical/allergy list for the group
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Credit card (ready for full upfront payment)
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-12 px-6 font-semibold">
            I Need More Time
          </Button>
          <Button onClick={onProceed} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold h-12 px-8 shadow-md">
            I Have Everything Ready <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
