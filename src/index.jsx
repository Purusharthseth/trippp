import InitializeTrip from './pages/Initialise-trip'
import Home from './pages/Home/Home'
import Hero from './components/custom/Hero'
import Header from './components/custom/Header'
import { Button } from './components/ui/button'
import { AuroraText } from './components/magicui/aurora-text'
import { InteractiveHoverButton } from './components/magicui/interactive-hover-button'
import { Input } from './components/ui/input'
import {SelectTravelsOptions, SelectBudgetOptions, AI_PROMPT} from './constants/options'
import { chatSession } from './services/AIModal'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Viewtrip from './pages/view-trip/[tripId]'
import { databases } from './services/AppwriteConfig'
import InfoSection from './components/View-Trip/InfoSection'
import Hotels from './components/View-Trip/Hotels'
import Places from './components/View-Trip/Places'
import { MagicCard } from './components/magicui/magic-card'
import PlaceCard from './components/View-Trip/PlaceCard'
import { GetPlacesDetails, PHOTO_REF_URL } from './services/GlobalAPI'
import HotelCard from './components/View-Trip/HotelCard'
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useDialog, { DialogContext, DialogContextProvider } from './context/Dialog'
import MyTrips from './pages/my-trips'
import useUser, { UserContext, UserContextProvider } from './context/UserContext'

export { InitializeTrip, Home, Hero , Header, Button, AuroraText, InteractiveHoverButton, Input, SelectTravelsOptions, 
SelectBudgetOptions, chatSession, AI_PROMPT, Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, 
Viewtrip, databases, InfoSection, Hotels, Places, MagicCard, PlaceCard, GetPlacesDetails, HotelCard, PHOTO_REF_URL, Popover, 
PopoverContent, PopoverTrigger, useDialog, DialogContext, DialogContextProvider, MyTrips, useUser, UserContext , UserContextProvider}