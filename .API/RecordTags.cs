// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordTags
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace CloudX.Shared
{
  public static class RecordTags
  {
    private static HashSet<string> IGNORE_TAGS = new HashSet<string>()
    {
      "a",
      "an",
      "the",
      "and"
    };

    public static string CommonAvatar
    {
      get
      {
        return "common_avatar";
      }
    }

    public static string ProfileIcon
    {
      get
      {
        return "profile_icon";
      }
    }

    public static string MessageItem
    {
      get
      {
        return "message_item";
      }
    }

    public static string WorldOrb
    {
      get
      {
        return "world_orb";
      }
    }

    public static string VirtualKeyboard
    {
      get
      {
        return "virtual_keyboard";
      }
    }

    public static string InteractiveCamera
    {
      get
      {
        return "interactive_camera";
      }
    }

    public static string Photo
    {
      get
      {
        return "camera_photo";
      }
    }

    public static string VRPhoto
    {
      get
      {
        return "vr_photo";
      }
    }

    public static string Photo360
    {
      get
      {
        return "360_photo";
      }
    }

    public static string PhotoStereo
    {
      get
      {
        return "stereo_photo";
      }
    }

    public static string AudioClip
    {
      get
      {
        return "audio_clip";
      }
    }

    public static string VideoClip
    {
      get
      {
        return "video_clip";
      }
    }

    public static string ClipAsset(string url)
    {
      return "clip_asset:" + url;
    }

    public static string ClipLength(double length)
    {
      return "clip_length:" + length.ToString((IFormatProvider) CultureInfo.InvariantCulture);
    }

    public static string LocationName(string name)
    {
      return "location_name:" + name;
    }

    public static string PresentUser(string userId)
    {
      return "user:" + userId;
    }

    public static string Timestamp(DateTime time)
    {
      return "timestamp:" + time.ToString("o");
    }

    public static string CorrespondingMessageId(string messageId)
    {
      return "message_id:" + messageId;
    }

    public static string CorrespondingWorldUrl(string worldUrl)
    {
      return "world_url:" + worldUrl;
    }

    public static string GetCorrespondingMessageId(HashSet<string> tags)
    {
      return RecordTags.ExtractValue(tags, "message_id:");
    }

    public static string GetCorrespondingWorldUrl(HashSet<string> tags)
    {
      return RecordTags.ExtractValue(tags, "world_url:");
    }

    private static string ExtractValue(HashSet<string> tags, string prefix)
    {
      if (tags == null)
        return (string) null;
      string str = tags.FirstOrDefault<string>((Func<string, bool>) (s => s.StartsWith(prefix)));
      if (str != null)
        str = str.Substring(prefix.Length);
      return str;
    }

    public static void GenerateTagsFromName(string name, HashSet<string> tags)
    {
      if (string.IsNullOrWhiteSpace(name))
        return;
      StringBuilder tagBuilder = new StringBuilder();
      foreach (char c in name)
      {
        if (char.IsLetter(c))
          tagBuilder.Append(char.ToLower(c));
        else
          RecordTags.ExtractTag(tagBuilder, tags);
      }
      RecordTags.ExtractTag(tagBuilder, tags);
    }

    private static void ExtractTag(StringBuilder tagBuilder, HashSet<string> tags)
    {
      if (tagBuilder.Length > 1)
      {
        string str = tagBuilder.ToString();
        if (!RecordTags.IGNORE_TAGS.Contains(str))
          tags.Add(str);
      }
      tagBuilder.Clear();
    }
  }
}
