import StyleGuideSubSection from './StyleGuideSubSection'
// badges - html
import NewBadge from '../Badges/NewBadge'
import SaleBadge from '../Badges/SaleBadge'
import WarningBadge from '../Badges/WarningBadge'
import NotAvailableBadge from '../Badges/NotAvailableBadge'
// badges - full
import BasicLibraryFull from '../Icons/Badges/Full/BasicLibrary'
import DigitalDownloadFull from '../Icons/Badges/Full/DigitalDownload'
import EditorsChoiceFull from '../Icons/Badges/Full/EditorsChoice'
import EPrintFull from '../Icons/Badges/Full/EPrint'
import LargePrintEditionFull from '../Icons/Badges/Full/LargePrintEdition'
import MintsFull from '../Icons/Badges/Full/Mints'
import MyScoreFull from '../Icons/Badges/Full/MyScore'
// badges - simple
import BasicLibrarySimple from '../Icons/Badges/Simple/BasicLibrary'
import DigitalDownloadSimple from '../Icons/Badges/Simple/DigitalDownload'
import EditorsChoiceSimple from '../Icons/Badges/Simple/EditorsChoice'
import EPrintSimple from '../Icons/Badges/Simple/EPrint'
import EPrintFoldersSimple from '../Icons/Badges/Simple/EPrintFolders'
import LargePrintEditionSimple from '../Icons/Badges/Simple/LargePrintEdition'
import MintsSimple from '../Icons/Badges/Simple/Mints'
import MyScoreSimple from '../Icons/Badges/Simple/MyScore'
// general
import AccountIcon from '../Icons/General/AccountIcon'
import BlogIcon from '../Icons/General/BlogIcon'
import CartIcon from '../Icons/General/CartIcon'
import EnvelopeIcon from '../Icons/General/EnvelopeIcon'
import EventsIcon from '../Icons/General/EventsIcon'
import FullArrowLeftIcon from '../Icons/General/FullArrowLeftIcon'
import FullArrowRightIcon from '../Icons/General/FullArrowRightIcon'
import ArrowUpIcon from '../Icons/General/ArrowUpIcon'
import ArrowRightIcon from '../Icons/General/ArrowRightIcon'
import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import ArrowLeftIcon from '../Icons/General/ArrowLeftIcon'
import ServicesIcon from '../Icons/General/ServicesIcon'
import TrackOrderIcon from '../Icons/General/TrackOrderIcon'
import ShippingIcon from '../Icons/General/ShippingIcon'
import HelpIcon from '../Icons/General/HelpIcon'
import CircledArrow from '../Icons/General/CircledArrow'
import CircledXIcon from '../Icons/General/CircledXIcon'
import ChevronLeft from '../Icons/General/ChevronLeft'
import ChevronRight from '../Icons/General/ChevronRight'
import ListBullets from '../Icons/General/ListBullets'
import PlayIcon from '../Icons/General/PlayIcon'
import SquaresFour from '../Icons/General/SquaresFour'
import ExclamationIcon from '../Icons/General/ExclamationIcon'
import CloseIcon from '../Icons/General/CloseIcon'
import CircledPlusIcon from '../Icons/General/CircledPlusIcon'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'
import AudioIcon from '../Icons/General/AudioIcon'
import CircledMinusIcon from '../Icons/General/CircledMinusIcon'
import ExtraPartsIcon from '../Icons/General/ExtraPartsIcon'
import MusicNoteIcon from '../Icons/General/MusicNoteIcon'
import PreviewsIcon from '../Icons/General/PreviewsIcon'
import SaveIcon from '../Icons/General/SaveIcon'
import ScoreIcon from '../Icons/General/ScoreIcon'
import ShipsIcon from '../Icons/General/ShipsIcon'
import VideoIcon from '../Icons/General/VideoIcon'
import StateIcon from '../Icons/General/StateIcon'
import NationalIcon from '../Icons/General/NationalIcon'
import EmailDelivery from '../Icons/General/EmailDelivery'
// logos
import CompanyLogo from '../Icons/Logos/CompanyLogo'
import Over145YearsLogo from '../Icons/Logos/Over145YearsLogo'
// social media
import Facebook from '../Icons/SocialMedia/Facebook'
import Instagram from '../Icons/SocialMedia/Instagram'
import LinkedIn from '../Icons/SocialMedia/Linkedin'
import Twitter from '../Icons/SocialMedia/Twitter'
import X from '../Icons/SocialMedia/X'
import YouTube from '../Icons/SocialMedia/Youtube'
import styles from './StyleGuideIcons.module.scss'
import StyleGuideIconCard from './StyleGuideIconCard'
// delivery
import DeliveryMethod from '../DeliveryMethod/DeliveryMethod'

const iconsBadgesHtml = [
  { icon: <NewBadge />, text: 'NewBadge' },
  { icon: <SaleBadge />, text: 'SaleBadge' },
  { icon: <WarningBadge badgeText="Delivery Delay" />, text: 'WarningBadge' },
  { icon: <NotAvailableBadge />, text: 'NotAvailableBadge' },
]

const iconsBadgesSimple = [
  { icon: <BasicLibrarySimple />, text: 'BasicLibrarySimple' },
  { icon: <DigitalDownloadSimple />, text: 'DigitalDownloadSimple' },
  { icon: <EditorsChoiceSimple />, text: 'EditorsChoiceSimple' },
  { icon: <EPrintSimple />, text: 'EPrintSimple' },
  { icon: <EPrintFoldersSimple />, text: 'EPrintFoldersSimple' },
  { icon: <LargePrintEditionSimple />, text: 'LargePrintEditionSimple' },
  { icon: <MintsSimple />, text: 'MintsSimple' },
  { icon: <MyScoreSimple />, text: 'MyScoreSimple' },
]

const iconsBadgesFull = [
  { icon: <BasicLibraryFull />, text: 'BasicLibraryFull' },
  { icon: <DigitalDownloadFull />, text: 'DigitalDownloadFull' },
  { icon: <EditorsChoiceFull />, text: 'EditorsChoiceFull' },
  { icon: <EPrintFull />, text: 'EPrintFull' },
  { icon: <LargePrintEditionFull />, text: 'LargePrintEditionFull' },
  { icon: <MintsFull />, text: 'MintsFull' },
  { icon: <MyScoreFull />, text: 'MyScoreFull' },
]

const iconsGeneral = [
  { icon: <AccountIcon className="accountLinkIcon" />, text: 'AccountIcon' },
  { icon: <BlogIcon />, text: 'BlogIcon' },
  { icon: <CartIcon className="cartButtonIcon" />, text: 'CartIcon' },
  { icon: <EnvelopeIcon />, text: 'EnvelopeIcon' },
  { icon: <EventsIcon />, text: 'EventsIcon' },
  { icon: <ArrowUpIcon />, text: 'ArrowUpIcon' },
  { icon: <ArrowRightIcon />, text: 'ArrowRightIcon' },
  { icon: <ArrowDownIcon />, text: 'ArrowDownIcon' },
  { icon: <ArrowLeftIcon />, text: 'ArrowLeftIcon' },
  { icon: <FullArrowLeftIcon />, text: 'FullArrowLeftIcon' },
  { icon: <FullArrowRightIcon />, text: 'FullArrowRightIcon' },
  { icon: <ServicesIcon />, text: 'ServicesIcon' },
  { icon: <TrackOrderIcon />, text: 'TrackOrderIcon' },
  { icon: <ShippingIcon />, text: 'ShippingIcon' },
  { icon: <HelpIcon />, text: 'HelpIcon' },
  { icon: <CircledArrow />, text: 'CircledArrow' },
  { icon: <CircledXIcon />, text: 'CircledXIcon' },
  { icon: <ChevronLeft />, text: 'ChevronLeft' },
  { icon: <ChevronRight />, text: 'ChevronRight' },
  { icon: <ListBullets />, text: 'ListBullets' },
  { icon: <SquaresFour />, text: 'SquaresFour' },
  { icon: <PlayIcon />, text: 'PlayIcon' },
  { icon: <ExclamationIcon />, text: 'ExclamationIcon' },
  { icon: <CircledPlusIcon />, text: 'CircledPlusIcon' },
  { icon: <CircledMinusIcon />, text: 'CircledMinusIcon' },
  { icon: <CloseIcon />, text: 'CloseIcon' },
  { icon: <ShipsIcon />, text: 'ShipsIcon' },
  { icon: <MusicNoteIcon />, text: 'MusicNoteIcon' },
  { icon: <VideoIcon />, text: 'VideoIcon' },
  { icon: <ArrowAltIcon />, text: 'ArrowAltIcon' },
  { icon: <AudioIcon />, text: 'AudioIcon' },
  { icon: <ExtraPartsIcon />, text: 'ExtraPartsIcon' },
  { icon: <PreviewsIcon />, text: 'PreviewsIcon' },
  { icon: <SaveIcon />, text: 'SaveIcon' },
  { icon: <ScoreIcon />, text: 'ScoreIcon' },
  { icon: <StateIcon />, text: 'StateIcon' },
  { icon: <NationalIcon />, text: 'NationalIcon' },
  { icon: <EmailDelivery />, text: 'EmailDelivery' },
]

const iconsLogos = [
  { icon: <CompanyLogo />, text: 'CompanyLogo' },
  { icon: <Over145YearsLogo />, text: 'Over145YearsLogo' },
]

const iconsSocialMedia = [
  { icon: <Facebook />, text: 'Facebook' },
  { icon: <Instagram />, text: 'Instagram' },
  { icon: <LinkedIn />, text: 'LinkedIn' },
  { icon: <Twitter />, text: 'Twitter' },
  { icon: <X />, text: 'X' },
  { icon: <YouTube />, text: 'YouTube' },
]

const iconsDelivery = [
  {
    icon: <DeliveryMethod deliveryMethod="Digital Download in My Account" />,
    text: 'Digital Download in My Account',
  },
  {
    icon: <DeliveryMethod deliveryMethod="Digital Download in My Library" />,
    text: 'Digital Download in My Library',
  },
  { icon: <DeliveryMethod deliveryMethod="DOWNLOAD" />, text: 'DOWNLOAD' },
  { icon: <DeliveryMethod deliveryMethod="EPRINT" />, text: 'EPRINT' },
  {
    icon: <DeliveryMethod deliveryMethod="Print Immediately in My Account" />,
    text: 'Print Immediately in My Account',
  },
  {
    icon: <DeliveryMethod deliveryMethod="SHIP_DIRECT" />,
    text: 'SHIP_DIRECT',
  },
  {
    icon: <DeliveryMethod deliveryMethod="Ships Direct from Manufacturer" />,
    text: 'Ships Direct from Manufacturer',
  },
  {
    icon: <DeliveryMethod deliveryMethod="Purchased Item will be Emailed" />,
    text: 'Purchased Item will be Emailed',
  },
  { icon: <DeliveryMethod deliveryMethod="OTHER" />, text: 'OTHER' },
  {
    icon: <DeliveryMethod deliveryMethod="Ships from J.W. Pepper" />,
    text: 'Ships from J.W. Pepper',
  },
]

const StyleGuideIcons = () => {
  return (
    <>
      <StyleGuideSubSection heading="Badges - HTML">
        <div className={styles.iconsGrid}>
          {iconsBadgesHtml.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>
      <StyleGuideSubSection heading="Badges - Full">
        <div className={styles.iconsGrid}>
          {iconsBadgesFull.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Badges - Simple">
        <div className={styles.iconsGrid}>
          {iconsBadgesSimple.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="General">
        <div className={styles.iconsGrid}>
          {iconsGeneral.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Logos">
        <div className={styles.iconsGrid}>
          {iconsLogos.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Social Media">
        <div className={styles.iconsGrid}>
          {iconsSocialMedia.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Delivery">
        <div className={styles.iconsGrid}>
          {iconsDelivery.map((icon) => {
            return <StyleGuideIconCard key={icon.text} icon={icon} />
          })}
        </div>
      </StyleGuideSubSection>
    </>
  )
}

export default StyleGuideIcons
